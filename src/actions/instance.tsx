import * as https from "https";

const instance = {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  }

export default instance;