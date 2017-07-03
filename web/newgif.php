<?php
require_once('lib.php');
echo print_header('Ajouter un gif');
?>
<section id="contact">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2>Ajouter des gifs</h2>
                <hr class="star-primary">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <form name="sentMessage" id="contactForm" method="post" action="newgif_treat.php">
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label for="cat">Nom de la catégorie (Elle doit déjà exister !)</label>
                            <input type="text" class="form-control" placeholder="Nom de la catégorie (Elle doit déjà exister !)" id="cat" required data-validation-required-message="Et je mets ça où si tu me dis pas ?" name="cat">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label for="newgifs">Liens des nouveaux gifs</label>
                            <textarea rows="15" class="form-control" placeholder="Liens des nouveaux gifs (séparés par un retour à la ligne)" id="newgifs" name="newgifs" required data-validation-required-message="Il faut des gifs quand même, sinon ça sert à rien :r"></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <button type="submit" class="btn btn-success btn-lg">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
</body>
</html>