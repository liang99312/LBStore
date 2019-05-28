/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.TuiGong;
import com.lb.lbstore.domain.TuiGongFei;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface TuiGongService {

    public TuiGong getTuiGongById(Integer id);
    
    public TuiGong getTuiGongDetailById(Integer id);
       
    public boolean updateTuiGong(TuiGong tuiGong);
    
    public String dealTuiGong(TuiGong tuiGong,Integer a01_id);
    
    public TuiGong saveTuiGong(TuiGong tuiGong);
    
    public boolean deleteTuiGong(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<TuiGong> queryTuiGongsByPage(HashMap map);

    public int queryFeiRows(HashMap map);
    
    public List<TuiGongFei> queryTuiGongFeisByPage(HashMap map);
    
    public TuiGongFei getTuiGongFeiById(Integer id);

     public boolean updateTuiGongFei(TuiGongFei tuiGongFei);
       
    public TuiGongFei saveTuiGongFei(TuiGongFei tuiGongFei);
    
    public boolean deleteTuiGongFei(Integer id,Integer tg_id);
}
