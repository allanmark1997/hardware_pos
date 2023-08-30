<?php

namespace App\Exports\Sheets;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class ProductMultipleSheet implements FromCollection, WithTitle, WithStrictNullComparison, WithDrawings
{
    public array $data;
    public string $sheet_title;

    public function __construct(array $data, string $sheet_title)
    {
        $this->data = $data;
        $this->sheet_title = $sheet_title;
    }

    public function collection()
    {
        return collect($this->data);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return $this->sheet_title;
    }

    // Public function headings(): array
    // {
    //     return [
    //         'SKU',
    //         'remark',
    //         'status',
    //     ];
    // }


    public function drawings()
    {
        // dd($this->data);
        $drawing = new Drawing();
        // $drawing->setName('Logo');
        // $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('/storage/images/products/AZFeHRojxyY1WikX2bkbvZPVIkO5S0FsFl4XMGTj.jpg'));
        $drawing->setHeight(90);
        $drawing->setCoordinates('N' . '3');

        // dd($this->data);
        $drawing2 = new Drawing();
        // $drawing->setName('Logo');
        // $drawing->setDescription('This is my logo');
        $drawing2->setPath(public_path('/storage/images/products/AZFeHRojxyY1WikX2bkbvZPVIkO5S0FsFl4XMGTj.jpg'));
        $drawing2->setHeight(90);
        $drawing2->setCoordinates('N' . '10');

        return [$drawing, $drawing2];
    }
}
