<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_menu
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Note. It is important to remove spaces between elements.
?>
<?php foreach ($list as $i => &$item) : ?>
    <?php if( preg_match('/^\#/', $item->flink ) ) : ?>
    	<?php $i += 1; ?>
        <!-- LEFT <?php echo $i; ?> -->
        <div class="ms-section" id="left<?php echo $i; ?>" data-anchor="<?php echo $item->alias; ?>">
        	<?php if( ( $page_title_alt = $item->params->get( 'page_title_alt' ) ) and ( $page_subtitle = $item->params->get( 'page_subtitle' ) ) and ( $page_subtitle_b = $item->params->get( 'page_subtitle-b' ) ) ) : ?>
            <div class="section-home">
                <div class="center">
                    <div class="col-md-8 section-margin">
                        <div class="home-name"><span><span><?php echo $page_title_alt; ?></span></span></div>
                        <div class="home-sub-a"><span><span><?php echo $page_subtitle; ?></span></span></div>
                        <div class="home-sub-b"><span><?php echo $page_subtitle_b; ?></span></div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        </div><!-- END LEFT <?php echo $i; ?> -->
    <?php endif ?>

<?php endforeach; ?>
