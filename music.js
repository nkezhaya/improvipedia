Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
  var a;
  if (null == this) throw new TypeError('"this" is null or not defined');
  var c = Object(this),
    b = c.length >>> 0;
  if (0 === b) return -1;
  a = +e || 0;
  Infinity === Math.abs(a) && (a = 0);
  if (a >= b) return -1;
  for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
    if (a in c && c[a] === d) return a;
    a++
  }
  return -1
});

(function () {
  var allKeys,
    remainingKeys,
    playedKeys = [],
    currentKey;

  function nextKey() {
    if (remainingKeys.length === 0) {
      currentKey = null

      $("#currentKey").html("All keys completed! Refresh.")
      return
    }

    shuffle(remainingKeys)
    currentKey = remainingKeys[0]
    $("#currentKey").html("Current Key: " + currentKey)
  }

  function done() {
    var index = remainingKeys.indexOf(currentKey);
    if (index > -1) {
      remainingKeys.splice(index, 1)
      playedKeys.push(currentKey)
      $(".btn-key").filter(function () {
        return $(this).text() === currentKey
      }).removeClass("btn-danger").addClass("btn-success")

      nextKey()
    }
  }

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  $(document).on("click", "#nextKey", nextKey)
  $(document).on("click", "#doneButton", done)

  $(function () {
    allKeys = $(".btn-key").map((i, el) => $(el).text()).toArray()
    remainingKeys = allKeys.slice(0)

    shuffle(remainingKeys)
    nextKey()
  })
}())