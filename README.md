# jQuery.timer
Licence: <b>Apache License, Version 2.0</b><br />
Demo: http://dev.maxschuster.eu/jQuery.timer/

jQuery wrapper for setInterval() with events

# Table of contents
{:toc}

# Example
```JavaScript
var $timer = $({}).timer({
      'delay': 1000,
      'repeatCount': 5
}).on('tick.timer complete.timer stop.timer start.timer reset.timer destroy.timer', function(e, d) {
      console.log(e.type, d);
}).timer('start');
```

# Methods

## init
Initializes the plugin on a jQuery object

### Usage:
```JavaScript
$({}).timer(options);
```

### Parameter:
<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Comment</th>
</tr>
<tr>
<td>options</td>
<td>Object</td>
<td>{}</td>
<td>Plugin options to override predefined settings. (See Settings)</td>
</tr>
</table>

### Returns:
<b>jQuery Object</b> <i>To provide chainability.</i>

## start
Starts the timer

### Usage:
```JavaScript
$({}).timer('start');
```

### Returns:
<b>jQuery Object</b> <i>To provide chainability.</i>

## stop
Stops the timer

### Usage:
```JavaScript
$({}).timer('stop', triggerEvent);
```

### Parameter:
<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
<th>Comment</th>
</tr>
<tr>
<td>triggerEvent</td>
<td>Boolean</td>
<td>true</td>
<td>Trigger the stop.timer event?</td>
</tr>
</table>

### Returns:
<b>jQuery Object</b> <i>To provide chainability.</i>

## reset
Stops the timer and resets its repeatCount. 

### Usage:
```JavaScript
$({}).timer('reset');
```

### Returns:
<b>jQuery Object</b> <i>To provide chainability.</i>

## destroy
Removes the timer from the current jQuery object

### Usage:
```JavaScript
$({}).timer('destroy');
```

### Returns:
<b>jQuery Object</b> <i>To provide chainability.</i>

# Events

## tick.timer
Dispatched whenever a Timer object reaches an interval specified according to the <b>delay</b> option.

## complete.timer
Dispatched whenever it has completed the number of requests set by <b>repeatCount</b> option.

## stop.timer 
Dispatched whenever the timer has been stoped.

## start.timer
Dispatched whenever the timer has been started.

## reset.timer
Dispatched whenever the timer has been reseted.

## destroy.timer
Dispatched whenever the timer has been destroyed.

# Settings

## delay
The delay between <b>tick.timer</b> events in milliseconds. <br />
<b>Type:</b> Integer<br/>
<b>Default:</b> 1000

## repeatCount
The number of times the timer has to tick till its complete<br />
<b>Type:</b> Integer<br />
<b>Default:</b> 1