import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Journal = () => {
  const currentDate = new Date();

  return (
    <JournalContainer>
      <ScrollContainer
        contentEditable="true"
        placeholder="Write some shit in here"
      >
        <h1>
          Lorem ipsum dolor sit amet, mea ubique legimus verterem in, qui cu
          nulla impetus, modo primis vix ei. Eu eam ceteros volumus propriae,
          ferri persius dissentias eam an, eu agam mollis nec. Ius omnis idque
          eirmod ei, no qui sensibus reformidans. Et verear accumsan delicata
          vix, sea sumo putent vivendo te. Ne pro solet inciderint, nam integre
          ancillae id. Impetus adipisci mea ut, timeam insolens cu mel. Ea quo
          facete eloquentiam. An pri sale numquam intellegebat, tota eius iudico
          ex vim. Eum legere malorum an, mazim laoreet pro eu, te mea dicta
          ceteros suavitate. Mea no singulis repudiandae, ne putent saperet
          singulis ius, mollis scripserit comprehensam ex quo. Graece nostrum ad
          sit, in deserunt signiferumque per, nam omittam recusabo eu. Quo
          impedit lucilius ne, sed no labore semper. Vix ne modo consectetuer,
          erant intellegam id ius. Nam sumo liber an, ut ludus deleniti
          scribentur mea. Modo maiorum no eam, vim facer ubique qualisque ea, id
          his labitur recteque appellantur. Id mei quot novum officiis, quo
          molestie constituto ne. Pro convenire euripidis argumentum ne. Nec ne
          fugit tempor. Veri accumsan expetenda per an. Alii verear dolorum at
          nec, lorem admodum cu eos, in quo qualisque quaerendum. Mel impetus
          commune democritum no, ius errem labore at, ei his tamquam expetenda
          persequeris. Euismod ceteros propriae eu qui, in dico iusto pri. Wisi
          vidit ex pri. Et nostro consequat adipiscing eum, cu usu illum
          rationibus. Nec novum delenit cu, omnes atomorum interpretaris nec id.
          Illum argumentum est ad, mel ad facete audiam electram. Sed eu mutat
          ceteros, id viderer tibique vis, suas impetus utroque id nam.
        </h1>
      </ScrollContainer>
    </JournalContainer>
  );
};

export default Journal;

const JournalContainer = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 10vh 15vw 10vh 25vw;
`;

const ScrollContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #fbfbfb;
  display: flex;
  word-break: break-word;

  &:focus {
    outline: none;
  }
`;

const Blah = styled.div`
  display: flex;
  word-break: break-word;

  /* &[contentEditable="true"]:empty:not(:focus):before {
    content: attr(placeholder);
  } */
`;

// background: linear-gradient(-180deg, #fff 78%, hsla(0, 0%, 100%, 0));
