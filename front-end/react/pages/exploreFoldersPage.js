import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import FolderImageLoader from './../components/images/loaders/folderImageLoader';
import ReadOnlyFolderTree from './../components/morgueFolder/readOnlyFolderTree';
import ImageSelectorComponent from './../components/images/imageSelectorComponent';
import postal from 'postal';
import SingleImageDisplay from './../components/images/singleImageDisplay';
import MoreLikeThis from './../components/moreLikeThis/moreLikeThisComponent';

export default class MorgueFoldersPage extends Component {
        
  constructor()
  {
      super();
     this.imageCount = 25;
     this.subscriptions = [];
     this.folderImageLoader = new FolderImageLoader(this.imageCount); 
  }
  
 
  componentWillMount()
  {
       this.state = {imageData: null,doingMoreLikeThis: false,folderData:null}
       this.folderImageLoader.onMount();
       let me = this;
       let sub1 = postal.subscribe({
                channel: "deviant-system",
                topic: "select-image" ,
                callback: function (data, envelope) {
                        //data.name  data.key
                        if ($("div.imageWrapper")[0])
                        {
                            $("div.imageWrapper")[0].scrollTop = 0;
                        }
                        me.setState({'imageData': data});

                }
               });
               
        let sub2 = postal.subscribe({
                 channel: "deviant-system",
                 topic: "select-target-folder" ,
                        callback: function (data, envelope) {
                                 me.setState({'imageData': null,folderData: me.folderImageLoader.getFolderData()});
                                 
                                 
                             
                        }
               });
      
      this.subscriptions.push(sub1)
      this.subscriptions.push(sub2)
  }
  
  componentWillUnmount () {
                        
      this.subscriptions.forEach((s) => s.unsubscribe());
       this.folderImageLoader.onUnMount();
      
  } 
  
  computePathDisplay()
   {
       let display = 
       this.state.imageData.categoryPath.replace(/\//g, " "+String.fromCharCode(8594)+" ");
       return display;
   }
   
   removeImage()
   {
       let folderName =  this.folderImageLoader.getFolderData().name;
       let message = "Do you want to remove this image from '"+ folderName +"?"
       
       let retVal = window.confirm(message);
       
       if (retVal)
       {
           //hit the database
           //hide the 
           this.setState({imageData: null});
           this.folderImageLoader.deleteFromFolder(this.state.imageData);
           
           
           
       }
       
   }
   
   moreLikeThisToggle()
   {
       let newToggle = !this.state.doingMoreLikeThis 
       this.setState({doingMoreLikeThis: newToggle})
   }
   
   toggleText()
   {
       if (this.state.doingMoreLikeThis )
       {
           return "Return To Folder View";
       }
       return "More Like This";
   }
   
  renderHeader()
  {
      let me = this;
      if (this.state && this.state.imageData)
      {
        return (
          <div>
          <div className='imageControl'><a target="_new" href={this.state.imageData.url}>View Deviant Art Page</a></div>
          <div className='imageControl'>{'Title: '+this.state.imageData.title}</div>
          <div className='imageControl'>{'Path: '+ me.computePathDisplay()}</div>
          <div className='imageControl'>
           
          <button onClick={me.removeImage.bind(me)} className="btn btn-small btn-red">Remove From Folder</button>              
                        
          </div>
       <div className='imageControl'>
           
          <button onClick={me.moreLikeThisToggle.bind(me)} className="btn btn-small btn-primary">{me.toggleText()}</button>              
                        
          </div>
          </div>
        )
      }
      
      return null;
  }
  
  renderImageComponents()
  {
      if (this.state.doingMoreLikeThis)
      {
          return <MoreLikeThis imageData={this.state.imageData} />;
      }
      return <ImageSelectorComponent imageLoader={this.folderImageLoader} />
  }
  
  getCSSForTabs(type)
  {
      let css = "tabItem ";
      if (type == "MORE")
      {
          if (this.state.doingMoreLikeThis)
          {
              css = css + "active "
          }
      }
      if (type == "IMAGES")
      {
          if (this.state.doingMoreLikeThis == false && this.state.folderData)
          {
              css = css + "active "
          }
      }
     
      
      return css;
  
      
  }
        
  render() {
      var me = this;
           
      
    return (
       
          <section className="exploreFolderComponent grouping">
          <h2>Explore Folders</h2>
            <div className="exploreFolderFlex">
               
               
                 <ReadOnlyFolderTree />
                
                <div className="exploreImageContainer">
                    <div className="tabContainer">
                           <div className="tabBar">
                             <div className={me.getCSSForTabs("IMAGES")}>Folder Images</div> 
                             <div className={me.getCSSForTabs("MORE")}>More Like This</div>
                           </div>   
                           {me.renderImageComponents()}
                    </div>
                </div>
               
                    
               
               <div className="currentImageControlContainer">
               {me.renderHeader()}
                    <SingleImageDisplay completeMessage={null} imageData={this.state.imageData}   />
                    
               </div>
            </div>
         </section>
    );
  }
}