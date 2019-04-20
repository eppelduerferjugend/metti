
FROM php:7.2-fpm
WORKDIR /srv

# Install dependencies
RUN apt-get update \
    ; \
    apt-get install -y \
        curl \
        git \
        libfreetype6-dev \
        libjpeg-dev \
        libmemcached-dev \
        libpng-dev \
        nginx \
        subversion \
        unzip \
    ; \
    docker-php-ext-configure gd \
        --enable-gd-native-ttf \
        --with-jpeg-dir=/usr/lib \
        --with-freetype-dir=/usr/include/freetype2 \
    ; \
    docker-php-ext-install \
        mysqli \
        pdo_mysql \
        gd \
    ; \
    pecl install \
        memcached-3.0.3 \
    ; \
    docker-php-ext-enable --ini-name pecl.ini \
        memcached \
    ;

# Install composer
RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/local/bin --filename=composer

# Configure Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY docker/app/nginx/site.conf /etc/nginx/conf.d/site.conf

# Configure PHP
COPY docker/app/php/php-local.ini /usr/local/etc/php/php.ini
COPY docker/app/php/opcache-local.txt /usr/local/etc/php/opcache-blacklist.txt

# Configure entrypoint
COPY docker/app/docker-app-entrypoint /usr/local/bin/

# Add application files
COPY . .

# Expose web port
EXPOSE 80
ENTRYPOINT ["docker-app-entrypoint"]
