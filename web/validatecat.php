<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 03/07/2017
 * Time: 11:41
 */

require_once('lib.php');

$waitingcats = json_decode(file_get_contents('../waitingcats.json'));
$cats = json_decode(file_get_contents('../cats.json'));

echo print_header('Valider les nouvelles catégories');
foreach ($waitingcats as $waitingcat) {
    echo make_bar($waitingcat);
}
echo print_footer();