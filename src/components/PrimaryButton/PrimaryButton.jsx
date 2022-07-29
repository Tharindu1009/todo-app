import './PrimaryButton.scss';

function PrimaryButton(props) {
    return (
        <button
            id={props.id}
            name={props.name}
            type={props.type}
            onClick={props.onClick}
            className="btn"
        >
            {props.text}
        </button>
    );
}

export default PrimaryButton;