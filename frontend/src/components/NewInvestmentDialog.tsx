// Add this import at the top with other imports
import { formatCurrency } from "@/lib/utils";

// Then replace any inline currency formatting with the utility function
// For example, in the card content:
<div className="font-bold">{formatCurrency(parseFloat(amount))}</div>