

https://github.com/login/oauth/authorize?
client_id=Iv1.832c7795ac17f136&
redirect_uri=http%3A%2F%2Flocalhost%3A8000&
state=abs123&
scope=read%3Auser


{
  let code = '3d3ad6d581040ae54b40';
  let state = 'abs123';
  let client_secret = '4a8f2ff77783660040768099c10165345ff60f0a';
  let client_id = 'Iv1.832c7795ac17f136'
  let redirect_uri = encodeURIComponent('http://localhost:8000');

  let query = `?code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let xhr = new XMLHttpRequest;
  xhr.open('POST', `https://github.com/login/oauth/access_token${query}`, true);
  xhr.send(null);

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readState === 4) {
      console.log(xhr.responseText);
    }
  })
}
// access_token=229bfdf121b6619284baa2bf61ff086f426855b5
{
  let xhr = new XMLHttpRequest;
  xhr.open('GET', `https://api.github.com/user`, true);
  xhr.setRequestHeader('Authorization', 'token 229bfdf121b6619284baa2bf61ff086f426855b5');
  xhr.send(null);

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readState === 4) {
      console.log(xhr.responseText);
    }
  })
}