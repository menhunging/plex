

<section class="questions-section">
    <div class="container">
        <div class="questions-section__inner">
            <h2 class="caption">Остались вопросы?</h2>
            <span class="caption-desc">Заполните форму, наши специалисты свяжутся с Вами</span>
            <form class="questions-from" method="post" action="/local/templates/plex/ajax/questions-form.php" id="questions-from">
                <div class="input-item">
                    <input type="text" placeholder="Ваше имя*" required name="username"  />
                </div>
                <div class="input-item">
                    <input type="text" placeholder="Город*" required name="city" />
                </div>
                <div class="input-item">
                    <input type="text" class="phone-mask" placeholder="Телефон*" name="phone" required />
                </div>
                <div class="input-item">
                    <textarea placeholder="Сообщение*" name="message" required></textarea>
                </div>
                <div class="questions-from__controls">
                    <button class="btn">отправить заявку</button>
                    <span class="questions-from__text">
                                    Нажимая кнопку «Отправить заявку», я даю согласие на обработку своих персональных
                                    данных в соответствии с <a href="<?=settings::$sitePoliticUrl?>">Политикой конфиденциальности</a>
                                </span>
                </div>
                <input type="hidden" class="sp" value="" name="sp">
                <input type="hidden" class="name" value="" name="name">
                <input type="hidden" class="sp" value="" name="sp">
                <input type="hidden" class="ss" value="<?=bitrix_sessid()?>" name="ss">
                <input type="hidden" name="recaptcha_response_order" id="recaptchaResponseQuestions">
                <input type="hidden" name="recaptcha_pkey_questions" value="<?= \Fouro\Recaptcha::PUBLIC_KEY?>">
            </form>
        </div>
    </div>
    <picture class='questions-section__back picture'>
        <source type="image/webp" srcset="<?=MARKUP_PATH?>img/bg-quest.webp" />
        <img src="<?=MARKUP_PATH?>img/bg-quest.jpg" alt="фото формы остались вопросы?" />
    </picture>
</section>
<script>
    $(document).ready(function() {
        const grecaptchaPKey = $('input[name="recaptcha_pkey_questions"]').val()
        var recaptchaResponse = document.getElementById('recaptchaResponseQuestions');

        grecaptcha.ready(function () {
            grecaptcha.execute(grecaptchaPKey, {action: 'contact'}).then(function (token) {
                var recaptchaResponse = document.getElementById('recaptchaResponseQuestions');
                recaptchaResponse.value = token;
                // Выполняем здесь вызов Ajax


            });
        });
    })

    $('.questions-from').on('submit', function(e){
        const grecaptchaPKey = $('input[name="recaptcha_pkey_questions"]').val()
        var recaptchaResponse = document.getElementById('recaptchaResponseQuestions');
        var status = 'fail';

        grecaptcha.ready(function () {
            grecaptcha.execute(grecaptchaPKey, {action: 'contact'}).then(function (token) {
                var recaptchaResponse = document.getElementById('recaptchaResponseQuestions');
                recaptchaResponse.value = token;


            });
        });

        $.ajax({
            url: '/local/templates/plex/ajax/recaptcha_check.php',
            method: 'post',
            dataType: 'html',
            data: {recaptchaResponse: recaptchaResponse.value},
            async: false,
            success: function(response){
                status = response
            }
        });

        if (status === 'fail') {
            alert('Произошла ошибка!');
            return false;
        }
    })
</script>