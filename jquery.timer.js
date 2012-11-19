/*
 * Copyright 2012 Max Schuster 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function($, undefined) {
    
    function getEventData(data) {
        return {
            delay: data.settings.delay,
            repeatCount: data.settings.repeatCount,
            currentCount: data.currentCount,
            running: data.running
        };
    }
    function tick() {

        return this.each(function() {

            var $this = $(this),
                    data = $this.data('timer');

            $.extend(data, {
                currentCount: data.currentCount + 1
            });

            $this.data('timer', data);

            if (data.settings.repeatCount !== 0 && data.currentCount >= data.settings.repeatCount) {
                $this.timer('stop', false);
                $this.trigger('complete.timer', getEventData(data));
            } else {
                $this.trigger('tick.timer', getEventData(data));
            }

        });

    }
    ;


    var methods = {
        'init': function(options) {

            return this.each(function() {

                var $this = $(this),
                        data = $this.data('timer');

                // If the plugin already has been initialized, destroy the old one!
                if (data) {
                    $this.timer('destroy');
                }

                data = {
                    currentCount: 0,
                    running: false,
                    interval: null,
                    settings: {
                        delay: 1000,
                        repeatCount: 1,
                        autoStart: false
                    }
                };

                $.extend(data.settings, options);

                $this.data('timer', data);

                if (data.settings.autoStart === true) {
                    $this.timer('start');
                }

            });
        },
        'destroy': function() {

            return this.each(function() {

                var $this = $(this),
                        data = $this.data('timer');

                $this.timer('stop', false);
                $this.trigger('destroy.timer', getEventData(data));
                // Namespacing FTW
                $this.off('.timer');
                $this.removeData('timer');

            });

        },
        'reset': function() {

            return this.each(function() {

                var $this = $(this),
                        data = $this.data('timer');

                $this.timer('stop', false);

                $.extend(data, {
                    currentCount: 0
                });

                $this.data('timer', data);

                $this.trigger('reset.timer', getEventData(data));

            });
        },
        'start': function() {

            return this.each(function() {

                var $this = $(this),
                        data = $this.data('timer');

                $.extend(data, {
                    interval: setInterval($.proxy(tick, $this), data.settings.delay),
                    running: true
                });

                $this.data('timer', data);

                $this.trigger('start.timer', getEventData(data));

            });

        },
        'stop': function(triggerEvent) {

            if (triggerEvent === undefined) {
                triggerEvent = true;
            }

            return this.each(function() {

                var $this = $(this),
                        data = $this.data('timer');

                clearInterval(data.interval);
                $.extend(data, {
                    interval: null,
                    running: false
                });

                $this.data('timer', data);

                if (triggerEvent === true) {
                    $this.trigger('stop.timer', getEventData(data));
                }

            });

        }
    };

    $.fn.timer = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.timer');
        }

    };

})(jQuery);