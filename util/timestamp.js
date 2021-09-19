//Get Old GMT timestamp by minutes
//Bharat Sewani
module.exports = {

     getDateString:  (passedTime = 0) => {

          //Create a date object with passed time
          let date_ob = new Date(Date.now() - 1000 * 60 * passedTime);
          
          // current date
          // adjust 0 before single digit date
          let date = ("0" + date_ob.getUTCDate()).slice(-2);
          // current month
          let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);
          // current year
          let year = date_ob.getFullYear();
          // current hours
          let hours = date_ob.getUTCHours();
          // current minutes
          let minutes = date_ob.getUTCMinutes();
          // current seconds
          let seconds = date_ob.getUTCSeconds();
          // Current Millisecond
          let milliseconds = date_ob.getUTCMilliseconds();

          // create date & time in YYYY-MM-DDTHH:MM:SS.fff000+00:00 format
          //Or can choose your specific formate upto Milliseconds
          let dateString = (year + "-" + month + "-" + date + "T" + hours + 
                            ":" + minutes + ":" + seconds + "." + milliseconds + "000+00:00").toString();
        //  console.log(year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + "000+00:00" );
          return dateString;
  }

}