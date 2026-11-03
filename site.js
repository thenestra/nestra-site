// Nestra · thenestra.app · shared by every page.
// The Microsoft Store link lives here only. Swap in the listing URL once it exists.
var NESTRA_STORE_URL = 'https://apps.microsoft.com/search?query=Nestra';
document.querySelectorAll('[data-store]').forEach(function (a) {
  a.href = NESTRA_STORE_URL; a.target = '_blank'; a.rel = 'noopener';
});
