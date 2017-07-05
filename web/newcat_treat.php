<?php
/**
 * Created by PhpStorm.
 * User: Baka Killer
 * Date: 22/06/2017
 * Time: 19:30
 */

require_once('lib.php');

$newcats = strtolower($_POST['newcats']);
$waitingcats = get_cat_list(true);
$cats = get_cat_list(false);

$newcats = explode(',', $newcats);
foreach ($newcats as $newcat) {
    $newcat = trim($newcat);
    if (!in_array($newcat, $cats) && !in_array($newcat, $waitingcats)) {
        $waitingcats[] = $newcat;
    }
}

if (set_cat_list(true, $waitingcats)) {
    echo "Votre demande a été enregistrée !";
} else {
    echo "Il y a eu un problème ! Contactez le gestionnaire du bot pour le lui signaler !";
}