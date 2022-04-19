const Button = ({ label, value, setDayHandler, selected }) => {

    return (
        <div >
            <button
                className={selected ? 'button activeButton' : 'button'}
                onClick={() => {
                    setDayHandler(value)
                }}
            >
                {label}
            </button>
        </div>
    )
}

export default Button
