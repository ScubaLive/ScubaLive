package com.ics414.scubalive.model;

public class Dive {
	
	private Plan planref;
	private int bottomt;
	private int depth;
	private int ndepth;
	private char spg;
	private char fpg;
	private boolean ssrequired;
	private boolean safe;

	public Dive(Plan plan) {
		this.planref = plan;
		bottomt = 0;
		depth = 0;
		ndepth = 0;
		spg = 'a';
		fpg = 'a';
		ssrequired = false;
		safe = true;
	}
	
	public int[] updateDive(int time, int depth) {
		return null;
	}
	
	public boolean isSafe() {
		return safe;
	}
	
	private int[] recommend() {
		return null;
	}
	
	private int timeAtDepth(char pg) {
		return pg;
	}

	private int depthAtTime(char pg) {
		return pg;
		
	}
	
}