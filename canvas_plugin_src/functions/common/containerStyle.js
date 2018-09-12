import { isValid } from '../../../common/lib/url';

export const containerStyle = () => ({
  name: 'containerStyle',
  aliases: [],
  context: {
    types: ['null'],
  },
  type: 'containerStyle',
  help:
    'Creates an object used for describing the properties of a series on a chart.' +
    ' You would usually use this inside of a charting function',
  args: {
    border: {
      types: ['string', 'null'],
      help: 'Valid CSS border string',
    },
    borderRadius: {
      types: ['string', 'null'],
      help: 'Number of pixels to use when rounding the border',
    },
    padding: {
      types: ['string', 'null'],
      help: 'Content distance in pixels from border',
    },
    backgroundColor: {
      types: ['string', 'null'],
      help: 'Valid CSS background color string',
    },
    backgroundImage: {
      types: ['string', 'null'],
      help: 'Valid CSS background image string',
    },
    backgroundSize: {
      types: ['string'],
      help: 'Valid CSS background size string',
      default: 'contain',
    },
    backgroundRepeat: {
      types: ['string'],
      help: 'Valid CSS background repeat string',
      default: 'no-repeat',
    },
    opacity: {
      types: ['number', 'null'],
      help: 'A number between 0 and 1 representing the degree of transparency of the element',
    },
    overflow: {
      types: ['string'],
      help: `Sets overflow of the container`,
    },
  },
  fn: (context, args) => {
    const { backgroundImage, backgroundSize, backgroundRepeat, ...remainingArgs } = args;
    const style = {
      type: 'containerStyle',
      ...remainingArgs,
    };

    if (backgroundImage) {
      if (!isValid(backgroundImage))
        throw new Error('Invalid backgroundImage. Please provide an asset or a URL.');
      style.backgroundImage = `url(${backgroundImage})`;
      style.backgroundSize = backgroundSize;
      style.backgroundRepeat = backgroundRepeat;
    }

    // removes keys with undefined value
    return JSON.parse(JSON.stringify(style));
  },
});
