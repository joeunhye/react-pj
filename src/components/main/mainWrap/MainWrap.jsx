import Banner from "../banner/Banner";
import Btns from "../btns/btns";
import Info from "../info/Info";
import News from "../news/News";
import Visual from "../visual/Visual";

function MainWrap() {

	return (
		<main>
            <Visual />
            <News />
            <Banner />
            <Info />
            <Btns />
        </main>
	);
}

export default MainWrap;