import {useState } from 'react'
import { InputBox } from './components/index.js'
import useCurrencyInfo from './hooks/usecurrencyinfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('usd')
  const [toCurrency, setToCurrency] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyinfo = useCurrencyInfo(fromCurrency)
  const options = Object.keys(currencyinfo)

const swap = () => {
  setFromCurrency(toCurrency)
  setToCurrency(fromCurrency)
  setAmount(convertedAmount)
  setConvertedAmount(amount)
}
 const convert = () => {
  if (!currencyinfo[toCurrency]) return
  setConvertedAmount((amount * currencyinfo[toCurrency]).toFixed(4))
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black px-4">
         <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide">
Currency Converter</h1>
          <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()}}
                    >
                      <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={setAmount}
                                currency={fromCurrency}
                                onCurrencyChange={setFromCurrency}
                                selectedCurrency={fromCurrency}
                                currencyOption={options}   
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
  type="button"
  onClick={swap}
  className="absolute left-1/2 -translate-x-1/2 -top-3 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1 rounded-md shadow-lg"
>
  swap
</button>

                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currency={toCurrency}
                                onCurrencyChange={setToCurrency}
                                selectedCurrency={toCurrency}
                                currencyOption={options}
                                amountDisable={true}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )};

export default App
