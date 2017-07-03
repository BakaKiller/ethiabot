<?php
/**
 * Created by PhpStorm.
 * User: Baka Killer
 * Date: 22/06/2017
 * Time: 19:30
 */

$newcats = strtolower($_POST['newcats']);
$waitingcats = json_decode(file_get_contents('../waitingcats.json'));
$cats = json_decode(file_get_contents('../cats.json'));

$newcats = explode(',', $newcats);
foreach ($newcats as $newcat) {
    $newcat = trim($newcat);
    if (!in_array($newcat, $cats) && !in_array($newcat, $waitingcats)) {
        $waitingcats[] = $newcat;
    }
}

if (file_put_contents('../waitingcats.json', json_encode($waitingcats))) {
    echo "Votre demande a été enregistrée !";
} else {
    echo "Il y a eu un problème ! Contactez le gestionnaire du bot pour le lui signaler !";
}