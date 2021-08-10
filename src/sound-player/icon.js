export default function Icon(props) {

    switch (props.name) {
        case "play":
            return (<
                svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="icon-play"
                width="24"
                height="24" > <path fill="#004066"
                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" > < /path></svg >
            );
        case "stop":
            return (<
                svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="icon-stop"
                width="24"
                height="24" > <path fill="#004066"
                    d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" > < /path></svg >
            );
        case "forward":
            return (<
                svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="icon-forward"
                width="24"
                height="24" > <path fill="#004066"
                    d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z" > < /path></svg >
            );
        case "backward":
            return (<
                svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="icon-backward"
                width="24"
                height="24" > < path fill="#004066"
                    d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z" > < /path></svg >
            );
        default:
            break;
    };

    return ( <> </>);
}