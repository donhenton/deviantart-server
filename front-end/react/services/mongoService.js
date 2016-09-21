import rp from 'request-promise';

class MongoService
{

    constructor()
    {

        this.rootURL =  'http://' + location.hostname + ":" + location.port + '/storage';
        
        
    }


 getDataForUser(uId)
    {
        let userId = null;
        if (typeof uId === 'string')
        {
            userId = parseInt(uId);
        }
        else
        {
            userId = uId;
        }
        
        
          
        return rp(this.rootURL+"/getDataForUser/"+userId);
    }



}

let instance = new MongoService();
export default instance;

