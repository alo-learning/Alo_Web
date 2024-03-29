<?php if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}
?>
<div class="fw-accordion">
	<?php foreach ( $atts['tabs'] as $tab ) : ?>
		<h3 class="fw-accordion-title element-title"><?php echo wp_kses_post($tab['tab_title']); ?></h3>
		<div class="fw-accordion-content">
			<p><?php echo do_shortcode( $tab['tab_content'] ); ?></p>
		</div>
	<?php endforeach; ?>
</div>