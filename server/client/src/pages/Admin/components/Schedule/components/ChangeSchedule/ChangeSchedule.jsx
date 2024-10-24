import ChangeInterval from "./components/ChangeInterval/ChangeInterval";
import Default from "./components/Default/Default";
import Intervals from "./components/Intervals/Intervals";

const ChangeSchedule = () => {
    return (
        <section className="change-schedule">
            <div className="heading">
                <h2 className="title">График</h2>
            </div>

            <Default />
            <Intervals />
            <ChangeInterval />
        </section>
    )
}

export default ChangeSchedule