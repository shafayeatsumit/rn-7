const refreshTokenUrl = "https://api.finder-lbs.com/v1/auth/refresh_token";
const accessToken = "a8a17af7-69e2-48b9-8d3b-c8b0ff424e1e"
const refreshToken = "b565af11-da26-4846-81b6-7faed58068f0"

let tokenData = {"refresh_token":refreshToken, "access_token":accessToken}
const getParameter = (accesstoken) => ({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accesstoken
    }
}) 

const refreshTokenParams = (tokenData) => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',                
  },
  body: JSON.stringify({
      "access_token": tokenData.access_token,
      "refresh_token": tokenData.refresh_token            
  })
})

const fetchRefreshToken = async (tokenData) => {
  console.log("inside fetchRefreshToken ++++")
  let response = await fetch(refreshTokenUrl,refreshTokenParams(tokenData))
  let responseJson = await response.json()
}

export const fetchHistoryData = async (url) => {

  try {
    let response = await fetch(url,getParameter(accessToken))
    let responseJson = await response.json()
    // acess token refreshing and fetching again.
    if (responseJson["error"] === "expired token") {
      fetchRefreshToken(tokenData)
      try {
        let response = await fetch(url,getParameter(tokenData.access_token))
        let responseJson = await response.json()
      } catch(error) {
        console.log("Err in refresh Token",error)
      }
      return responseJson
    }else {
      return responseJson
    }

  } catch (error){
    console.log("Err in Get Asset Data",error)
  }  
}