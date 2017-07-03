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
echo '<style>
.bar {
    width:100%;
    border: solid 1px;
}
.bar .cat {
    font-size: 20px;
}
</style>';
echo '<section class=".container-fluid">';
foreach ($waitingcats as $waitingcat) {
    echo make_bar($waitingcat);
}
echo '</section>';
echo print_footer();