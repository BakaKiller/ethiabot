<?php
require_once('lib.php');
echo print_header('Ajouter une catégorie');
?>
<section id="contact">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h2>Ajouter des catégories</h2>
                <hr class="star-primary">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <form name="sentMessage" id="contactForm" method="post" action="newcat_treat.php">
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label for="newcats">Nom des nouvelles catégories</label>
                            <input type="text" class="form-control" placeholder="Nom des nouvelles catégories séparés par des virgules (hug,blanked,pout,poke,jojo)" id="newcats" required data-validation-required-message="Non mais ça sert à rien si vous mettez rien." name="newcats">
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
</body>
</html>