import './Alert.modules.css'

type AlertProp = {
    alertMessage: string
}


const Alert = ({ alertMessage }: AlertProp) => {
    return (
        <p className='alert'>{alertMessage}</p>
    )
}

export default Alert