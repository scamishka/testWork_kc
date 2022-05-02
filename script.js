console.log('start js');

var $addCommentBtn = $('.js-add-comment');
var $readMoreBtn = $('.js-read-more');
var $authBtn = $('.js-auth');

var login = true;

function templateComment(imageUser, nameUser, textComment, dateComment) {
    var image = (imageUser) ? imageUser : 'https://bootstraptema.ru/snippets/icons/2016/mia/1.png';
    var name = (nameUser) ? nameUser : 'Пользователь';
    var text = (textComment) ? textComment : 'Текст комментария';
    var date =  (dateComment) ? dateComment : new Date().toLocaleDateString();
    var commentTmp = '' +
        '<div class="media-block">' +
        '                        <a class="media-left" href="#">' +
        '                            <img class="img-circle img-sm"' +
        '                                 alt="Профиль пользователя"' +
        '                                 src="' + image + '">' +
        '                        </a>' +
        '                        <div class="media-body">' +
        '                            <div class="mar-btm">' +
        '                                <a href="#" class="btn-link text-semibold media-heading box-inline">' + name + '</a>' +
        '                                <p class="text-muted text-sm">' +
        '                                    <i class="fa fa-mobile fa-lg"></i> - ' + date + '</p>' +
        '                            </div>' +
        '                            <p>' + text + '</p>' +
        '                            <hr>' +
        '                        </div>' +
        '                    </div>';
    return commentTmp;
}

if ($addCommentBtn) {
    console.log('1');
    $addCommentBtn.on('click', function (e) {
        e.preventDefault();
        console.log('click 1');
        if (login) {
            console.log('login true');
            $('.js-comment-body').prepend(templateComment())
        } else {
            $('#addComment').modal()
        }
    });
}

if ($readMoreBtn) {
    console.log('2');
    $readMoreBtn.on('click', function (e) {
        e.preventDefault();
        console.log('click 2');
        $.ajax({
            url: 'json/comments.json',
            method: 'GET',
            success: function (result) {
                console.log('success ajax comment');
                console.log(result);
                if (result) {
                    $.each(result, function (index, value) {
                        if (index < 3) {
                            console.log(index, ' - ', value.name);
                            $('.js-comment-body').append(templateComment(value.image, value.name, value.comment, value.date))
                        }
                    })
                }
            }
        })

    });
}

if ($authBtn) {
    console.log('3');
    $authBtn.on('click', function (e) {
        e.preventDefault();
        console.log('click 3');

    });
}
