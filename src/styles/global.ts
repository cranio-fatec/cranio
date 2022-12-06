import { createGlobalStyle } from 'styled-components'

import theme from './theme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font: 400 16px ${({ theme }) => theme.fonts.primary}, sans-serif;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

	ul {
		list-style: none;
	}



  // React Modal
  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.3);


    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;

    display: flex;
    align-items: center;
    justify-content: center;
  }


  // NProgress
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${theme.colors.yellow};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${theme.colors.yellow}, 0 0 5px ${theme.colors.yellow};
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: ${theme.colors.yellow};
    border-left-color: ${theme.colors.yellow};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }


.dots-spinner {
  margin-top: 100px;
	width: 100%;
	text-align: center;

	&.lazy-spinner {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	> div {
		width: 15px;
		height: 15px;
		background-color: ${theme.colors.blue_2};

		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}

	.bounce1 {
		margin-right: 8px;
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.bounce2 {
		margin-right: 8px;
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
}
`
