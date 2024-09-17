const ACCESS_REQUESTS_URL = "requests/";
const REQUEST_PENDING_COUNT = ACCESS_REQUESTS_URL.concat("pending-count");
const REQUEST_PENDING = ACCESS_REQUESTS_URL.concat("pending");
const REQUEST_APPROVE = (requestId) =>  ACCESS_REQUESTS_URL.concat(`approve/${requestId}`);
const REQUEST_REJECT = (requestId) =>  ACCESS_REQUESTS_URL.concat(`reject/${requestId}`);

export {REQUEST_PENDING, REQUEST_PENDING_COUNT, REQUEST_APPROVE, REQUEST_REJECT};