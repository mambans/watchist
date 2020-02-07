const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      // console.log(`Cookie ${cname}: ${c.substring(name.length, c.length)}`);
      if (c.substring(name.length, c.length) === "null") return null;

      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export { getCookie };
