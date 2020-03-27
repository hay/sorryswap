# Sorry Not Sorry Machine
This is the code for the 'Sorry Not Sorry Machine', created in colloboration with [SETUP](https://www.setup.nl/) and [Casper de Jong](http://casperdejong.com/) and [Wendy van der Waal](http://degrotewendy.website/#/).

## Installation and development

    npm install

Should install all Node.js dependencies. All configuration can be done in `conf.toml`. Note that you need a working installation of [facetool](https://github.com/hay/facetool) in your PATH.

To run the server you can do

    npm run dev

And you should be able to see the machine at [http://localhost:3000/](http://localhost:3000/).

Note that you can manipulate the state of the webapp using commands after the hash. For example, to go to the recorder and mute:

    http://localhost:3000/#screen=recorder,muted=1

You can see all screens here:

    http://localhost:3000/#screen=index

For a full list of all possible debug switches check out the 'mutations' section of `app/js/store.js`.

Not all videos and files might be available in this repository. Contact SETUP for more instructions.

## Troubleshooting
* If you're getting 'Device not responding' errors, try unplugging and plugging in the USB cam again

## Credits
Code written by [Hay Kranen](https://www.haykranen.nl). Designs by [Wendy van der Waal](http://degrotewendy.website).

## License
Code (Javascript, HTML, SCSS and CSS) is licensed under the [MIT license](https://opensource.org/licenses/MIT). This license only applies to the code, not the media (images, videos, audio, fonts).