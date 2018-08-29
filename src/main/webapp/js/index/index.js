nextgo = function () {
    $.ajax({
        url: "/nextgo",
        type: "get",
        data: ""
    }).success(function (result) {
            window.location.href = result.nextgo;
        }
    )
};

getComment = function (name) {
    $.ajax({
        url: "/getcomment",
        type: "get",
        data: {"name": name}
    }).success(function (result) {
            alert(result);
        }
    )
};

/*
 How can geometry
 bear affection?
 It's the purest love:
 projection.
 */
const animationType = 'headShake'
const blob = document.querySelectorAll('.blob')[0];
const body = document.getElementsByTagName('body')[0];


blob.addEventListener('mouseenter', function () {
    blob.classList.add(animationType);
})
;

blob.addEventListener('mouseleave', function () {
    blob.classList.remove(animationType);
})
;

body.addEventListener('mousemove', function (e) {
    if (e.clientY < blob.offsetHeight) {
        blob.classList.add('look-up');
    }
    else {
        blob.classList.remove('look-up');
    }

    if (e.clientY > (blob.offsetHeight + 150)) {
        blob.classList.add('look-down');
    } else {
        blob.classList.remove('look-down');
    }


    if (e.clientX < (blob.offsetLeft)) {
        blob.classList.add('look-left');
    } else {
        blob.classList.remove('look-left');
    }

    if (e.clientX > (blob.offsetLeft + 235)) {
        blob.classList.add('look-right');
    } else {
        blob.classList.remove('look-right');
    }
})
;