
function getRandomString()
{
 return Math.random().toString(36).substring(2, 15);
}
 function request(url, body)
{

  var req = new XMLHttpRequest();
  req.open('POST', url, false);
 req.setRequestHeader('Content-type', 'application/json; charset=utf-8');


  req.send(JSON.stringify(body));


  return JSON.parse(req.responseText)

}

const baseUrl="http://localhost:1337"





let country=request(baseUrl+"/countries", {
  "name": getRandomString()

})
console.log(country)

let province=request
(baseUrl+"/provinces", {
  "name": getRandomString(),
"country":country
})

let city=request
(baseUrl+"/cities", {
  "name": getRandomString(),
  "province":province
})

let street=
request(baseUrl+"/streets", {
  "name": getRandomString(),
  "postCode": "22-333",
  "city":city
})

let sportType0=
request(baseUrl+"/sport-types", {
  "name": getRandomString(),

})

let sportType1=
request(baseUrl+"/sport-types", {
  "name": getRandomString(),
})

let mUser0=request(baseUrl+"/m-users",{"nick": getRandomString(),});
let mUser1=request(baseUrl+"/m-users",{"nick": getRandomString(),});
let mUser2=request(baseUrl+"/m-users",{"nick": getRandomString(),});
let mUser3=request(baseUrl+"/m-users",{"nick": getRandomString(),});
let mUser4=request(baseUrl+"/m-users",{"nick": getRandomString(),});
let mUser5=request(baseUrl+"/m-users",{"nick": getRandomString(),});

//sports-facilities
let sportsFacility0=request(baseUrl+"/sports-facilities", {
  "name": getRandomString(),
  "street":street,
  "number": "1",
  "sport_types": [
   sportType0,
    sportType1
  ],
});
let sportsFacility1=request(baseUrl+"/sports-facilities", {
  "name": getRandomString(),
  "street":street,
  "number": "1",
  "sport_types": [
    sportType0,
    sportType1
  ],
});


let useSearchingForGames0=request(baseUrl+"/user-searching-for-games", {
  "m_user": mUser0,
  "sports_facilities": [
    sportsFacility0,
    sportsFacility1,
  ],
  "sport_type": sportType0,
});

let useSearchingForGames1=request(baseUrl+"/user-searching-for-games", {
  "m_user": mUser1,
  "sports_facilities": [
    sportsFacility0,
    sportsFacility1,
  ],
  "sport_type": sportType0,
});

let useSearchingForGames2=request(baseUrl+"/user-searching-for-games", {
  "m_user": mUser2,
  "sports_facilities": [
    sportsFacility1,

  ],
  "sport_type": sportType0,
});

let useSearchingForGames3=request(baseUrl+"/user-searching-for-games", {
  "m_user": mUser3,
  "sports_facilities": [
    sportsFacility0,

  ],
  "sport_type": sportType1,
});

let useSearchingForGames4=request(baseUrl+"/user-searching-for-games", {
  "m_user": mUser4,
  "sports_facilities": [
    sportsFacility0,

  ],
  "sport_type": sportType1,
});


let team0=request(baseUrl+"/team", {
  "name": getRandomString(),
  "owner": mUser0,
  "team_users": [

  ],
});
//invite dates
let userTeam0=request(baseUrl+"/user-team", {
  "inviteDate": "2021-11-05T10:07:17.052Z",
  "m_user": "string",
  "team": "string",
  "published_at": "2021-11-05T10:07:17.052Z",
  "created_by": "string",
  "updated_by": "string"
});
