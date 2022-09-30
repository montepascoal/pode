export function hideEmail(email) {
  return email.replace(/(.{2})(.*)(?=@)/,
    function(gp1, gp2, gp3) { 
      for(let i = 0; i < gp3.length; i++) { 
        gp2+= "*"; 
      } return gp2; 
    });
}

export function showPartString(text, lenght) {
  return text.substring(0,lenght) + '...';
}

export function objectIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}