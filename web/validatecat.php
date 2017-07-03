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

if (isset($_POST['ajax']) && $_POST['ajax'] && isset($_POST['data']) && $_POST['data']) {
    $data = json_decode($_POST['data']);
    switch ($data->action) {
        case 'validate':
            break;
        case 'delete':
            break;
        default:
            throw new Exception('Mauvais message wesh');
    }
} else {
    echo print_header('Valider les nouvelles catégories');
    echo '<style>
.bar:nth-child(1) {
    border-top: none;
}
.bar {
    width:100%;
    border-top: solid 1px #cccccc;
    padding: 3px;
    margin:0;
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
}