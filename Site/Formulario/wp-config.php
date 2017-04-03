<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'Formulario');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.n_AaoeO&W?K-Ko/Xxp&3u)RdJ2#Zj3~Tgt|ic)hTLB<SQ?fRH0SyU,.&>@?IHbJ');
define('SECURE_AUTH_KEY',  'v]HhHLCSgDZruA+K@A}e8b0XNwzG`lLfQvmk2yCU35ofj0~&p[@>{Wf !yy/cS%?');
define('LOGGED_IN_KEY',    'jDGT$QskKF/n]q>mY/z1Jy?^~mur#NJn8,s2F>]6NM;&P-;owKdnr>E[+?$3hlIY');
define('NONCE_KEY',        '&9=!Szuq$z+sl9;~;F@b#j18}w9=4i-#$.nTCLrG~P;Y0-FYs!F@KJ07@Oz:/f.+');
define('AUTH_SALT',        'Tq6(eaUcVTi64^Q;}Y04C$HLK%IXKoVht`*ZG4JX*nG|38sV{;nX8&W}d?C22U%v');
define('SECURE_AUTH_SALT', 'bzyF$Nw)tqjxM4aK+%S*b]s1lUs9Z_*VVDO;SC (T[uvA^J7[N=5CnY):d+el9;{');
define('LOGGED_IN_SALT',   '>qzS@ll,|MVg1SNE6:8+/al}}s5 X4.T.f?+Hk#u}7W><AF$yU!gQtQv-U`]h?t{');
define('NONCE_SALT',       'otqGb6a6lom;!qn1mNE#k%1bJ]q8UN{yQ.ikDIu~5XMe=:m29kFGG-^Lkq8=pC~=');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
