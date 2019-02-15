
    var request = require('request');
    var striptags = require('striptags');
    var cheerio = require("cheerio");

    var baseURL = ""
    var crawlerLinks = []
    var result_MailID = []
    

     //Unique value maker
     function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }

     //Base function / Constructor
     emailFetcher = function(baseURLstr='')
      {
        if(baseURLstr && baseURLstr!='')
          {
            baseURL = baseURLstr
            crawlerLinks.push(baseURL)
          }
         else
          {
            throw new Error('Given base URL "'+baseURLstr+'" is invalid!');
          }   
        
      } 

     // Recursion function for iterating to get email ids
     emailFetcher.prototype.getEmails = function(resultCallback,index=0){

            if(crawlerLinks[index].indexOf(baseURL)>-1){
              
             // Fetching html content from given URL   
             request(crawlerLinks[index], function (error, response, body) {
            
                var $ = cheerio.load(body);

                $("a").each(function() {
                    var link = $(this);
                    var href = link.attr("href");

                if(href && href!='' && href.substr(0,1)!='#' && href.indexOf('mailto:')==-1 && href.indexOf('tel:')==-1 && href.indexOf('http:')==-1 && href.indexOf('https:')==-1)
                { 
                        var crawlerLinksStr = ''  
                        if(href.substr(0,1)=='/')
                        {            
                            crawlerLinksStr = baseURL.substr(0,baseURL.length-1)+href                
                        }
                        else
                        {
                            crawlerLinksStr=baseURL+href
                        }

                        crawlerLinks.push(crawlerLinksStr)
                                
                        } 
                        else if(href && href!='' && (href.indexOf('http:')>-1 || href.indexOf('https:')>-1) && href.indexOf(baseURL)>-1)
                        {            
                            crawlerLinks.push(href)
                        } 
                });
            
                if(crawlerLinks) 
                crawlerLinks = crawlerLinks.filter(onlyUnique)
                
                var found = striptags(body).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
                
                if(found)
                  {
                    found = found.filter(onlyUnique);

                    found.forEach((mail)=>{
                        
                        result_MailID.push(mail)
                        result_MailID=result_MailID.filter(onlyUnique)
                        
                    })
                  } 
                
                if(crawlerLinks[index+1])
                  emailFetcher.prototype.getEmails(resultCallback,index+1)
                else
                  resultCallback(result_MailID)
            });
            
            } // Valid URL if true block
        }






