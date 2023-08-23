<?php

namespace App\Exports\Sheets;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithTitle;

class SurveyDataSheet implements FromCollection, WithTitle, WithStrictNullComparison
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
}