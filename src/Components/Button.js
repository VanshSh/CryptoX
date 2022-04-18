const Button = ({ label, value, setDayHandler, selected }) => {

    return (
        <>
            <button
                className={selected ? 'button activeButton' : 'button'}
                onClick={() => {
                    setDayHandler(value)
                }}
            >
                {label}
            </button>
        </>
    )
}

export default Button
