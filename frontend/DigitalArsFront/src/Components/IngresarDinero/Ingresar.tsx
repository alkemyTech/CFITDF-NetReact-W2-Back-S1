
import DepositoModal from "../Dashboard/DepositoModal";


function Transaccion() {
 

  return (
    <div>
      <h2>Realizar transferencia</h2>
      <DepositoModal onClose={function (): void {
        throw new Error("Function not implemented.");
      } }></DepositoModal>
    </div>
  );
}

export default Transaccion;
