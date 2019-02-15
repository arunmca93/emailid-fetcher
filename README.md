
# emailid-fetcher

Emailid fethcer is used for fetching the email IDs from given website link.

## Installation

Run below command to install emailid-fetcher.

```bash
npm install emailid-fetcher
```

## Usage

```nodejs


 var emailFethcer = require('emailid-fetcher')
 var fetcher = new emailFetcher('http://www.allwinsoft.com/')

 //Fetching and return email IDs by callback funtion
 fetcher.getEmails(function(emails){
    console.log(emails)
 })

```

## Output

```
[ 'allwinsoft@mail.com' ]

```

