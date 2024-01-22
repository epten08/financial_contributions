<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContributionResource;
use App\Models\Contribution;
use App\Http\Requests\StoreContributionRequest;
use App\Http\Requests\UpdateContributionRequest;
use App\Models\User;

class ContributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contributions = Contribution::with('user')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return ContributionResource::collection($contributions);
    }

    /**
     * Display contributions per individual
     */
    public function userContributions(User $user){
        $contributions = Contribution::where('user_id',$user->id)
            ->orderBy('id','desc')
            ->paginate(10);

        return ContributionResource::collection($contributions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContributionRequest $request)
    {
        $data = $request->validated();
        $contribution = Contribution::create($data);

        return response(new ContributionResource($contribution),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contribution $contribution)
    {
        return new ContributionResource($contribution);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContributionRequest $request, Contribution $contribution)
    {
        $data = $request->validate();
        $contribution->update($data);

        return new ContributionResource($contribution);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contribution $contribution)
    {
        $contribution->delete();

        return response("",204);
    }
}
