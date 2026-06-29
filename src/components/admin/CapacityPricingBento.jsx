// src/components/admin/CapacityPricingBento.jsx
import GlassPanel from "./GlassPanel";
import '../../styles/admin.css';

export default function CapacityPricingBento({ formState, onChange }) {
  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
    onChange(field, value === "" ? "" : Number(value));
  };

  return (
    <div className="capacity-bento">
      <GlassPanel className="capacity-bento__price">
        <label className="admin-form-field__label" htmlFor="ticketPrice">
          Ticket Price ($)
        </label>
        <div className="capacity-bento__price-row">
          <span className="capacity-bento__price-symbol">$</span>
          <input
            id="ticketPrice"
            type="number"
            placeholder="199"
            value={formState.ticketPrice}
            onChange={handleNumberChange("ticketPrice")}
            className="capacity-bento__price-input"
          />
        </div>
      </GlassPanel>

      <GlassPanel className="capacity-bento__total">
        <label className="admin-form-field__label" htmlFor="totalCapacity">
          Total Capacity
        </label>
        <input
          id="totalCapacity"
          type="number"
          placeholder="100"
          value={formState.totalCapacity}
          onChange={handleNumberChange("totalCapacity")}
          className="capacity-bento__total-input"
        />
      </GlassPanel>

      <GlassPanel className="capacity-bento__limits">
        <div>
          <label className="capacity-bento__limit-label capacity-bento__limit-label--male" htmlFor="maleLimit">
            Male Limit
          </label>
          <input
            id="maleLimit"
            type="number"
            placeholder="50"
            value={formState.maleLimit}
            onChange={handleNumberChange("maleLimit")}
          />
        </div>
        <div>
          <label className="capacity-bento__limit-label capacity-bento__limit-label--female" htmlFor="femaleLimit">
            Female Limit
          </label>
          <input
            id="femaleLimit"
            type="number"
            placeholder="50"
            value={formState.femaleLimit}
            onChange={handleNumberChange("femaleLimit")}
          />
        </div>
      </GlassPanel>
    </div>
  );
}