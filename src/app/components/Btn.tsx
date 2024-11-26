

interface BtnProps {
    label: string;
}

export default function Btn(Props: BtnProps) {
    return(
        <>
            <button>{Props.label}</button>
        </>
    )
}