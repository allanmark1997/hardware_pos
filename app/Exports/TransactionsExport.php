<?php

namespace App\Exports;

use App\Exports\Sheets\TransactionMultipleSheet;
use App\Models\Delivery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class TransactionsExport implements WithMultipleSheets
{
    use Exportable;
    public array $datas;
    public array $titles;

    public function __construct(array $datas, array $titles)
    {
        $this->datas = $datas;
        $this->titles = $titles;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    /* public function collection()
    {
        return [collect($this->data), collect($this->data)];
    } */

    public function sheets(): array
    {
        $sheets = [];
        for ($i = 0; $i < count($this->datas); $i++) {
            $sheets[] = new TransactionMultipleSheet($this->datas[$i], $this->titles[$i]);
        }
        return $sheets;
    }
}
