import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import WaitIndicator from './waitIndicator';
import postal from 'postal';




export default class Main extends Component {

    constructor()
    {
        super();
        this.subscriptions = [];

    }

    componentWillMount()
    {
        this.state = {isProcessing: true};
        let me = this;


        let s1 = postal.subscribe({
            channel: "mongo-system",
            topic: "ack-mongo-data",
            callback: function (data, envelope) {
                
                //storage service loaded itself as it responsed to request-mongo-data
                //this just acks and lets the program proceed
                if (data.ack == "OK")
                {
                    me.setState({isProcessing: false});
                }
                else
                {
                    ///could handle error here
                }

            }
        });

        this.subscriptions.push(s1);

    }

    componentDidMount()
    {
        //call the mongo service
        //load the data into the storage service via a setter
        
         
        postal.publish({
            channel: "mongo-system",
            topic: "request-mongo-data",
            data: {requestType: "INITIALIZE"}
        });

    }

    componentWillUnmount() {

        this.subscriptions.map((sub) => {
            sub.unsubscribe()
        })

    }

    render() {
        if (this.state.isProcessing)
        {
            return <WaitIndicator isProcessing={this.state.isProcessing} />
} else
{



            return (
<div>

    <header>

        <figure className="logo"><a href="/">Deviant Art Morgue Files</a><br/></figure> 

        <nav className="topMenu grouping">


            <ul>





                <li><Link to="/">Search For Images</Link></li>
                <li><Link to="/exploreFolders">Explore Folders</Link></li>
                <li><Link to="/maintainFolders">Maintain Folders</Link></li>

            </ul>    


        </nav>




    </header>



    <section id="main" className="grouping">

        {this.props.children}
    </section>


</div>

                    );





}// end else


} //end render
}