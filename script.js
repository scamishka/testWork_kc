console.log('start js');

var $addCommentBtn = $('.js-add-comment');
var $readMoreBtn = $('.js-read-more');
var $authBtn = $('.js-auth');

class Auth {
    constructor() {
        this._auth = false;
    }

    getAuth() {
        return this._auth;
    }

    setAuth(value) {
        this._auth = value;
    }
}

var author = new Auth;

$('#userAuth').validate({
    rules: {
        name: {
            required: true,
            minlength: 3
        },
        login: {
            required: true,
            minlength: 3
        },
        pass: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        name: {
            required: "Обязательное поле",
            minlength: "Введите имя не менее 5 символов"
        },
        login: {
            required: "Обязательное поле",
            minlength: "Введите имя не менее 5 символов"
        },
        pass: {
            required: "Обязательное поле",
            minlength: "Пароль должен быть не менее 5 символов"
        }
    },
    errorPlacement: function(error, element) {
        var item = element.parents('.item');
        item.append(error);
    }
})

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

function successAuth() {
    var $form = $('#userAuth')
    $('.js-modal-text').text('Вы авторизованы');
    $form.val('');
    $form.hide();
    $('.js-modal-text').removeClass('error');
    setTimeout(function () {
        $('#authUser').modal('hide');
    }, 1000)
    author.setAuth(true);
}

function errorAuth () {
    $('.js-modal-text').text('Неверный логин и пароль');
    $('.js-modal-text').addClass('error');
    author.setAuth(false);
}

function ajaxSubmit() {
    console.log('ajaxForm');
    var $form = $('#userAuth');
    if ($form.valid()) {
        console.log('valid');
        var authData = $form.serialize();
        console.log($form.find('[name = "login"]').val());
        var login = $form.find('[name = "login"]').val();
        var pass = $form.find('[name = "pass"]').val();
        $.ajax({
            url: 'json/auth.json',
            method: 'GET',
            data: authData,
            success: function (result) {
                console.log('success auth');
                if (result) {
                    if (result.login === login && result.password === pass) {
                        successAuth();
                    } else {
                        errorAuth();
                    }
                }
            }

        })
    }

}

if ($addCommentBtn) {
    $addCommentBtn.on('click', function (e) {
        e.preventDefault();
        if (author.getAuth()) {
            $('.js-comment-body').prepend(templateComment())
        } else {
            $('#authUser').modal()
        }
    });
}

if ($readMoreBtn) {
    $readMoreBtn.on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'json/comments.json',
            method: 'GET',
            success: function (result) {
                if (result) {
                    $.each(result, function (index, value) {
                        if (index < 3) {
                            $('.js-comment-body').append(templateComment(value.image, value.name, value.comment, value.date))
                        }
                    })
                }
            }
        })

    });
}

if ($authBtn) {
    $authBtn.on('click', function (e) {
        e.preventDefault();
        ajaxSubmit();
    });
}
